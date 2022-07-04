//npm install react-axios 
import React from 'react';
import './App.css';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios'


const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

type TCoin = {
  name: string,
  fullName: string,
  imageUrl: string,
  price: number,
  volime24Hour: number,
}


function App() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [currency, setCurrency] = React.useState('EUR');
  const [allCoins, setAllCoins] = React.useState <Array<TCoin>>([]);

  React.useEffect(() => {
    axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
    .then(({data}) => {
      const coins: Array<TCoin> = data.Data.map((coin: any) => {
        const obj: TCoin = {
          name: coin.CoinInfo.Name,
          fullName: coin.CoinInfo.FullName,
          imageUrl: `https://cryptocompare.com/${coin.CoinInfo.ImageUrl}`,
          price: coin.RAW.USD.PRICE,
          volime24Hour: coin.RAW.USD.VOLUME24HOUR,
        };
        return obj
      });
      setAllCoins(coins);
    }) //получить объект дата из пришедшего объекта
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  return (
    <Container maxWidth="lg">
      <Grid sx={{ p: 10 }} container spacing={2}>
        <Grid item xs={8}>
          <Item>
            <TableContainer>
              <Table sx={{ minWidth: 600 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">FullName</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Volume(24h)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allCoins.map((row) => (
                    <TableRow
                      key={row.name}
                      // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left"> <img src={row.imageUrl} alt={row.name} style={{width: '30px'}}/> </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.fullName}</TableCell>
                      <TableCell align="left">${(row.price).toFixed(3)}</TableCell>
                      <TableCell align="left">${Math.round(row.volime24Hour)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Grid >
              <TextField id="outlined-basic" label="Сумма" variant="outlined" sx={{ m: 1, width: '55%' }} />
              <TextField
                sx={{ m: 1, width: '30%' }}
                id="outlined-select-currency"
                select
                label="Валюта"
                value={currency}
                onChange={handleChange}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid >
              <TextField id="outlined-basic" label="Сумма" variant="outlined" sx={{ m: 1, width: '55%' }} />
              <TextField
                sx={{ m: 1, width: '30%' }}
                id="outlined-select-currency"
                select
                label="Валюта"
                value={currency}
                onChange={handleChange}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
