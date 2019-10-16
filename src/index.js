// you can import css in your js file!
import 'bootstrap/dist/css/bootstrap.css'
import './css/index.css'
// import {SmallGift} from './gifts'

// If you want to use jquery
import $ from 'jquery'
const axios = require('axios')
// const SmallGift = require('./gifts.js')


class SmallGift {
    constructor() {
        this.type = 'small'
        this.weight = 1
        this.timeToPrepare = 0.5
    }
}

class NormalGift {
    constructor() {
        this.type = 'normal'
        this.weight = 2
        this.timeToPrepare = 1
    }
}

class BigGift {
    constructor() {
        this.type = 'big'
        this.weight = 5
        this.timeToPrepare = 2
    }
}

class Dwarf {

}

let totalGiftWeight = 0
let gifts = []

$("#prepareGiftId").click(function () {
    let giftTypeId = $("#giftTypeId").val();
    console.log("giftTypeId", giftTypeId)
    if (totalGiftWeight >= 12) {
        alert('Gift weight exceeded')
    } else {
        if (giftTypeId === 'small') {
            prepareSmallGift()
        } else if (giftTypeId === 'normal') {
            prepareNormalGift()
        } else if (giftTypeId === 'big') {
            prepareBigGift()
        }
    }
    console.log("gifts",gifts)
    console.log("weight",totalGiftWeight)

});

$("#deliverGiftId").click(function () {
axios({
    url: 'http://localhost:8081',
    method: 'post',
    data: {
        gifts: gifts
    }
})
    .then((response) => {
        console.log("res",response);
        if(response == 204){
            alert("Gifts Delivered")
        }
    }, (error) => {
        console.log("error",error);
    });
})


const getGift = (gift) => new Promise(resolve => {
    setTimeout(() => {
        let sledDisplayText = document.getElementById('sledDisplayId').textContent;
        console.log("got gift " + gift.weight)
        document.getElementById('sledDisplayId').innerHTML = sledDisplayText + "<div> The gift weight  is " + gift.weight + " kg </div>"
        resolve()
    }, gift.timeToPrepare * 1000)
})

const prepareSmallGift = () => {
    let small = new SmallGift();
    console.log("small", small)
    // return small
    totalGiftWeight += small.weight
    gifts.push(small);
    getGift(small)
}

const prepareNormalGift = () => {
    let normal = new NormalGift()
    console.log("normal", normal)
    totalGiftWeight += normal.weight
    gifts.push(normal);
    getGift(normal)
}

const prepareBigGift = () => {
    let big = new BigGift()
    console.log("big", big)
    totalGiftWeight += big.weight
    gifts.push(big);
    getGift(big)
}

