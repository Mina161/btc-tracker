import { PRICES, PRICES_SUCCESS, PRICES_FAIL, COINS, COINS_SUCCESS, COINS_FAIL } from "./types";
import { getRequest, postRequest, putRequest } from "../../../core/network";
import endpoints from "../../../constants/endPoints.json";
import { notification } from "antd";
import { parse } from 'node-html-parser';

export const getPrices = () => (dispatch) => {
    dispatch({ type: PRICES });

    const prices = {
        pound: 0,
        half: 0,
        quarter: 0
    }

    getRequest(undefined, undefined, undefined, endpoints.pounds.full)
        .then((response) => {
            const { data } = response;
            const doc = parse(data)
            prices.pound = parseInt(doc.querySelector(".price").text.split(" ")[0].replace(",", ""))
            getRequest(undefined, undefined, undefined, endpoints.pounds.half)
                .then((response) => {
                    const { data } = response;
                    const doc = parse(data)
                    prices.half = parseInt(doc.querySelector(".price").text.split(" ")[0].replace(",", ""))
                    getRequest(undefined, undefined, undefined, endpoints.pounds.quarter)
                        .then((response) => {
                            const { data } = response;
                            const doc = parse(data)
                            prices.quarter = parseInt(doc.querySelector(".price").text.split(" ")[0].replace(",", ""))
                            getRequest(undefined, undefined, undefined, endpoints.pounds._10ingot)
                                .then((response) => {
                                    const { data } = response;
                                    const doc = parse(data)
                                    prices._10ingot = parseInt(doc.querySelector(".price").text.split(" ")[0].replace(",", ""))
                                    getRequest(undefined, undefined, undefined, endpoints.pounds._5ingot)
                                        .then((response) => {
                                            const { data } = response;
                                            const doc = parse(data)
                                            prices._5ingot = parseInt(doc.querySelector(".price").text.split(" ")[0].replace(",", ""))
                                            getRequest(undefined, undefined, undefined, endpoints.pounds._2p5ingot)
                                                .then((response) => {
                                                    const { data } = response;
                                                    const doc = parse(data)
                                                    prices._2p5ingot = parseInt(doc.querySelector(".price").text.split(" ")[0].replace(",", ""))
                                                    return dispatch({
                                                        type: PRICES_SUCCESS,
                                                        payload: prices,
                                                    });
                                                })
                                                .catch((err) => {
                                                    notification.error({ message: err?.message })
                                                    console.log(err);
                                                    return dispatch({
                                                        type: PRICES_FAIL,
                                                    });
                                                });
                                        })
                                        .catch((err) => {
                                            notification.error({ message: err?.message })
                                            console.log(err);
                                            return dispatch({
                                                type: PRICES_FAIL,
                                            });
                                        });
                                })
                                .catch((err) => {
                                    notification.error({ message: err?.message })
                                    console.log(err);
                                    return dispatch({
                                        type: PRICES_FAIL,
                                    });
                                });
                        })
                        .catch((err) => {
                            notification.error({ message: err?.message })
                            console.log(err);
                            return dispatch({
                                type: PRICES_FAIL,
                            });
                        });
                })
                .catch((err) => {
                    notification.error({ message: err?.message })
                    console.log(err);
                    return dispatch({
                        type: PRICES_FAIL,
                    });
                });
        })
        .catch((err) => {
            notification.error({ message: err?.message })
            console.log(err);
            return dispatch({
                type: PRICES_FAIL,
            });
        });
};

export const getCoins = (data) => (dispatch) => {
    dispatch({
        type: COINS
    })
    try {
        const currCoins = JSON.parse(localStorage.getItem("btcCoinsOwned")) || []
        return dispatch({
            type: COINS_SUCCESS,
            payload: currCoins
        })
    } catch (err) {
        console.log(err)
        return dispatch({
            type: COINS_FAIL
        })
    }
};

export const saveCoins = () => (dispatch, useState) => {
    dispatch({
        type: COINS
    })
    try {
        const currCoins = useState()?.coins?.data
        localStorage.setItem("btcCoinsOwned", JSON.stringify(currCoins))
        notification.success({ message: "Coins Saved" })
        return dispatch({
            type: COINS_SUCCESS,
            payload: currCoins
        })
    } catch (err) {
        console.log(err)
        return dispatch({
            type: COINS_FAIL
        })
    }
};

export const addCoin = (data) => (dispatch, useState) => {
    dispatch({
        type: COINS
    })
    try {
        const currCoins = useState()?.coins?.data
        currCoins.push(data)
        return dispatch({
            type: COINS_SUCCESS,
            payload: currCoins
        })
    } catch (err) {
        console.log(err)
        return dispatch({
            type: COINS_FAIL
        })
    }
};

export const removeCoin = (data) => (dispatch, useState) => {
    dispatch({
        type: COINS
    })
    try {
        const currCoins = useState()?.coins?.data
        const newCoins = currCoins.filter((coin) => coin.id !== data)
        return dispatch({
            type: COINS_SUCCESS,
            payload: newCoins
        })
    } catch (err) {
        console.log(err)
        return dispatch({
            type: COINS_FAIL
        })
    }
};

export const clearCoins = () => (dispatch, useState) => {
    dispatch({
        type: COINS
    })
    try {
        return dispatch({
            type: COINS_SUCCESS,
            payload: []
        })
    } catch (err) {
        console.log(err)
        return dispatch({
            type: COINS_FAIL
        })
    }
};