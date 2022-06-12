import React, { PropsWithChildren, useEffect, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Button,
  Paper,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

// const links = {
//   BUY_MINECRAFT: 'https://www.minecraft.net/zh-hans/store/minecraft-java-edition',
// };

const AccountTypeHeader = ({
  children,
  type,
  current,
  setCurrent,
}: PropsWithChildren<{
  type: AccountType;
  current: AccountType;
  setCurrent: React.Dispatch<React.SetStateAction<AccountType>>;
}>) => (
  <Stack direction="row" pl={1} gap={1} justifyContent="flex-start" alignItems="center">
    <Radio value={type.toString()} checked={current === type} onChange={() => setCurrent(type)} />
    <Typography variant="h6" sx={{ m: 2 }}>
      {children}
    </Typography>
  </Stack>
);

enum AccountType {
  microsoft = '0',
  offline = '1',
}

export default function AccountsPage(): React.ReactElement {
  const [accountType, setAccountType] = useState<AccountType>(localStorage.accountType);

  useEffect(() => {
    localStorage.accountType = accountType;
  }, [accountType]);

  return (
    <Stack
      direction="column"
      gap={2}
      p={2}
      sx={{ width: '100%', height: '100%', boxSizing: 'border-box' }}
    >
      {accountType === AccountType.offline && (
        <>
          <Alert severity="warning">
            <AlertTitle>Using an offline account</AlertTitle>
            Due to using an offline account, you have a changeable UUID and not customizable skin.
            <br />
            Notice that you can't join an online-mode server using an offline account.
          </Alert>
        </>
      )}
      <Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <AccountTypeHeader
          type={AccountType.microsoft}
          current={accountType}
          setCurrent={setAccountType}
        >
          Microsoft
        </AccountTypeHeader>
        <Stack alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }} gap={1} mb={1}>
          <Button size="large" variant="contained" disabled>
            Continue with Microsoft
          </Button>
          <Typography variant="caption">
            Still working on Microsoft account authentication
          </Typography>
        </Stack>
      </Paper>
      {/*<Paper sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>*/}
      {/*  <AccountType>External</AccountType>*/}
      {/*</Paper>*/}
      <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
        <AccountTypeHeader
          type={AccountType.offline}
          current={accountType}
          setCurrent={setAccountType}
        >
          Offline
        </AccountTypeHeader>
        <Stack alignItems="center" justifyContent="center" sx={{ flexGrow: 1 }} gap={1} mb={1}>
          <TextField
            onFocus={() => setAccountType(AccountType.offline)}
            label="Account Name"
            sx={{ width: '65%' }}
            helperText="It's recommended to use a name without space less than 15 characters."
          />
          {/*<Typography variant="caption">*/}
          {/*   To*/}
          {/*  avoid this, buy the game.*/}
          {/*</Typography>*/}
          {/*<Button*/}
          {/*  startIcon={<Icon>shopping_cart</Icon>}*/}
          {/*  onClick={() => }*/}
          {/*>*/}
          {/*  Buy Minecraft: Java Edition*/}
          {/*</Button>*/}
        </Stack>
      </Paper>
      {/*<Paper sx={{ flexGrow: 1 }}>*/}
      {/*  <AccountType>Extern</AccountType>*/}
      {/*</Paper>*/}
    </Stack>
  );
}
