import { FormEvent, useState } from "react";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";
import { Typography, Button, Stack } from "@mui/material";

import { initCis2NftContract } from "../models/Cis2NftClient";
import { CIS2_NFT_CONTRACT_INFO, CIS2_MULTI_CONTRACT_INFO } from "../Constants";
import { Cis2ContractInfo } from "../models/ConcordiumContractClient";
import ContractSelect from "./ContractSelect";

function Cis2Init(props: {
	provider: WalletApi;
	account: string;
	contractInfo?: Cis2ContractInfo;
	onDone: (address: ContractAddress, contractInfo: Cis2ContractInfo) => void;
}) {
	const contractInfos = [CIS2_NFT_CONTRACT_INFO, CIS2_MULTI_CONTRACT_INFO];
	const [state, setState] = useState({
		error: "",
		processing: false,
	});

	function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setState({ ...state, processing: true });
		const formData = new FormData(event.currentTarget);
		const contractName =
			props.contractInfo?.contractName ||
			formData.get("contractName")?.toString() ||
			"";
		const contractInfo =
			props.contractInfo ||
			contractInfos.find((i) => i.contractName === contractName);

		if (!contractInfo) {
			setState({ ...state, error: "Invalid Contract Name" });
			return;
		}

		initCis2NftContract(props.provider, contractInfo, props.account)
			.then((address) => {
				setState({ ...state, processing: false });
				props.onDone(address, contractInfo);
			})
			.catch((err: Error) => {
				setState({ ...state, processing: false, error: err.message });
			});
	}

	return (
		<Stack component={"form"} spacing={2} onSubmit={submit}>
			{state.error && (
				<Typography component="div" color="error" variant="body1">
					{state.error}
				</Typography>
			)}
			{state.processing && (
				<Typography component="div" variant="body1">
					Deploying..
				</Typography>
			)}
			<ContractSelect contractName={props.contractInfo?.contractName}/>
			<Button variant="contained" disabled={state.processing} type="submit">
				Deploy New
			</Button>
		</Stack>
	);
}

export default Cis2Init;
