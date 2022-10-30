import { Divider, Stack, Typography } from "@mui/material";
import { WalletApi } from "@concordium/browser-wallet-api-helpers";
import { ContractAddress } from "@concordium/web-sdk";

import Cis2Init from "./Cis2Init";
import Cis2FindInstance from "./Cis2FindInstance";

function Cis2FindInstanceOrInit(props: {
	provider: WalletApi;
	account: string;
	onDone: (address: ContractAddress) => void;
}) {
	return (
		<Stack spacing={2}>
			<Cis2FindInstance provider={props.provider} onDone={props.onDone} />
			<Typography variant="overline">Or</Typography>
			<Cis2Init {...props} />
		</Stack>
	);
}

export default Cis2FindInstanceOrInit;