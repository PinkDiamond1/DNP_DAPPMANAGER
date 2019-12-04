import { ReturnData } from "../route-types/listPackages";
import * as eventBus from "../eventBus";
import * as db from "../db";
// Modules
import { listContainers } from "../modules/docker/listContainers";
import { dockerDf } from "../modules/docker/dockerApi";
// Utils
import { omit } from "lodash";
import parseDockerSystemDf from "../utils/parseDockerSystemDf";
import Logs from "../logs";
import { RpcHandlerReturnWithResult } from "../types";
import { readConfigFiles } from "../utils/configFiles";
const logs = Logs(module);

// This call can fail because of:
//   Error response from daemon: a disk usage operation is already running
// Prevent running it twice
let isDockerSystemDfCallRunning = false;

/**
 * Returns the list of current containers associated to packages
 */
export default async function listPackages(): RpcHandlerReturnWithResult<
  ReturnData
> {
  let dnpList = await listContainers();

  // Append envFile and manifest
  dnpList.map(dnp => {
    try {
      const { manifest, environment } = readConfigFiles(dnp);
      dnp.manifest = omit(manifest, ["gettingStarted"]);
      dnp.envs = environment;
      dnp.gettingStarted = manifest.gettingStarted;
      dnp.gettingStartedShow = Boolean(
        db.packageGettingStartedShow.get(dnp.name)
      );
    } catch (e) {
      logs.warn(`Error appending ${dnp.name} files: ${e.stack || e.message}`);
    }
  });

  // ##### EMIT data before appending system data
  eventBus.packages.emit(dnpList);

  // Append volume info
  // This call can fail because of:
  //   Error response from daemon: a disk usage operation is already running
  if (!isDockerSystemDfCallRunning)
    try {
      isDockerSystemDfCallRunning = true;
      const dockerSystemDfData = await dockerDf();
      dnpList = parseDockerSystemDf({ dockerSystemDfData, dnpList });
    } catch (e) {
      logs.error(`Error on listPackages, appending volume info: ${e.stack}`);
    } finally {
      isDockerSystemDfCallRunning = false;
    }

  return {
    message: `Listing ${dnpList.length} packages`,
    result: dnpList
  };
}
