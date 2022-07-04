import React, { memo } from 'react';
import { Stack, Typography } from '@mui/material';

export default memo(function NotFoundBox(): React.ReactElement {
  // const emotionList = [
  //   'Σ(っ °Д °;)っ',
  //   '┌(。Д。)┐',
  //   '(＃°Д°)',
  //   '(ˉ▽ˉ;)',
  //   '(○´･д･)ﾉ',
  //   ':(',
  // ];
  // const emotion = emotionList[Math.floor(Math.random() * emotionList.length)];

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={1}
      sx={{ flexGrow: 1, color: '#9e9e9e' }}
    >
      <Typography variant="h3" component="span">
        {/*{emotion}*/}
        〒▽〒
      </Typography>
      <Typography variant="h6" component="span">
        Nothing's here.
      </Typography>
    </Stack>
  );
});
