import {
  ConsensusClientMainnet,
  consensusClientsMainnet,
  ExecutionClientMainnet,
  executionClientsMainnet
} from "../../types";

export const isExecClient = (
  client: string
): client is ExecutionClientMainnet =>
  executionClientsMainnet.includes(client as ExecutionClientMainnet);

export const isConsClient = (
  client: string
): client is ConsensusClientMainnet =>
  consensusClientsMainnet.includes(client as ConsensusClientMainnet);
