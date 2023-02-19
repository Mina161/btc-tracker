import * as React from 'react';
import { Typography, Paper, IconButton, InputBase, Box, Container, Pagination, CircularProgress, Accordion, AccordionSummary, AccordionDetails, Button, Slider, Select, MenuItem, Card, FormHelperText, Grid, InputLabel, FormControl, Chip, TextField } from '@mui/material';
import { connect } from "react-redux";
import { getPrices, addCoin, getCoins, saveCoins, clearCoins, removeCoin } from '../app/store/actions/actions';
import moment from "moment"
import { v1 } from "uuid"

export const Index = ({ prices, getPrices, coins, addCoin, getCoins, saveCoins, clearCoins, removeCoin }) => {

    React.useEffect(() => {
        getCoins();
        getPrices();
    }, [])

    const getCurrValue = () => {
        var allValues = coins?.data?.map((coin) => {
            switch (coin.type) {
                case "Pound": return prices?.data?.pound;
                case "Half": return prices?.data?.half;
                case "Quarter": return prices?.data?.quarter;
                default: return 0;
            }
        })
        const currValue = allValues.reduce((accumulator, value) => accumulator + value, 0)
        return currValue 
    }

    const [statistics, setStatistics] = React.useState({
        value: coins?.data?.reduce((accumulator, coin) => accumulator + parseInt(coin.value), 0),
        currValue: getCurrValue()
    })

    const {value, currValue} = statistics

    const handleAddCoin = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const id = v1()
        const newCoin = { type: data.get("coin"), value: data.get("coin-value"), id: id }
        addCoin(newCoin)
    }

    if (prices?.isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Container component="main" maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
            </Box>
            <Grid container direction="row" display="flex" justifyContent="space-evenly" alignItems="center">
                <Grid item xs={6} display="flex-row" alignItems="center">
                    <Accordion>
                        <AccordionSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>My Coins</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box component="form" onSubmit={handleAddCoin}>
                                <FormControl fullWidth margin='normal'>
                                    <InputLabel id="demo-simple-select-label">Pound Options</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="coin"
                                        name="coin"
                                        label="Pound Options"
                                    >
                                        <MenuItem value={"Pound"}>One Pound</MenuItem>
                                        <MenuItem value={"Half"}>Half Pound</MenuItem>
                                        <MenuItem value={"Quarter"}>Quarter Pound</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    id="coin-value"
                                    name="coin-value"
                                    label="Coin Purchase Price"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    inputProps={{ min: 0 }}
                                    margin='normal'
                                />
                                <Grid container sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    {coins?.data?.map((coin) => <Grid item m={1}><Chip label={`${coin.type} @ ${coin.value} EGP`} onDelete={() => removeCoin(coin.id)} /></Grid>)}
                                </Grid>
                                <Button variant="contained" type='submit' sx={{ margin: 1 }} >Add Coin</Button>
                                <Button variant="contained" onClick={clearCoins} sx={{ margin: 1, bgcolor: "maroon" }} >Clear Coins</Button>
                                <Button variant="contained" onClick={saveCoins} sx={{ margin: 1, bgcolor: "goldenrod" }} >Save Coins</Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
            <hr />
            <Box>
                <Card sx={{margin: 2}}>
                    <Typography fontWeight="bold" fontSize={42}>BTC Prices as of {moment().format("DD/MM/yyyy hh:mm")}</Typography>
                    <Typography fontSize={22}>One Pound: {prices?.data?.pound}</Typography>
                    <Typography fontSize={22}>Half Pound: {prices?.data?.half}</Typography>
                    <Typography fontSize={22}>Quarter Pound: {prices?.data?.quarter}</Typography>
                </Card>
                <Card sx={{margin: 2}}>
                    <Typography fontSize={30}>Purchase Value: {value} EGP</Typography>
                    <Typography color={currValue > value ? "green":"red"} fontSize={30}>Total Earnings: {currValue - value} EGP</Typography>
                </Card>
            </Box>
        </Container>
    );
}

const mapStateToProps = (state) => ({
    prices: state?.prices,
    coins: state?.coins
});

const mapDispatchToProps = { getPrices, getCoins, addCoin, saveCoins, clearCoins, removeCoin };

export default connect(mapStateToProps, mapDispatchToProps)(Index);