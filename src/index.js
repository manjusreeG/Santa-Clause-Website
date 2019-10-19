// you can import css in your js file!
import 'bootstrap/dist/css/bootstrap.css'
import './css/index.css'
import { write } from './writer'

import $ from 'jquery'
const axios = require('axios')

let totalGiftWeight
let gifts
$('#prepareGift').hide();

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
    getGift = (gift) => {
        $('#prepareGift').show();
        setTimeout(() => {
            let sled = new Sled();
            sled.addingGiftToSled(gift);
            $('#prepareGift').hide();
        }, gift.timeToPrepare * 1000)
    }
    prepareGift = (giftTypeId) => {
        let giftObj;
        let type = giftTypeId;
        if (type === 'small') {
            giftObj = new SmallGift();
        } else if (type === 'normal') {
            giftObj = new NormalGift();
        } else if (type === 'big') {
            giftObj = new BigGift();
        }
        totalGiftWeight += giftObj.weight
        gifts.push(giftObj)
        this.getGift(giftObj)
    }
}

class Sled {
    addingGiftToSled(gift) {
        if (totalGiftWeight <= 12) {
            write("sledDisplayId", " \n This is your " + gift.type + " of " + gift.weight + " kg   \n ")
        } else {
            write("infoMsgId", "Gift weight exceeded")
        }
    }
}

class Reindeers {
    deliverGift() {
        axios({
            url: 'http://localhost:8081',
            method: 'post',
            data: {
                gifts: gifts
            }
        })
            .then((response) => {
                if (response.status === 204) {
                    $('#prepareGiftId').attr("disabled", false);
                    initFn();
                    write("infoMsgId", "Gifts Delivered")
                }
            }, (error) => {
                let sledDisplayText = document.getElementById('sledDisplayId').innerText
                if (sledDisplayText !== "") {
                    write("infoMsgId", 'Reindeers:\n "I am Hungry!!!!"')
                    $('#deliverGiftId').attr("disabled", true);
                    $('#reqToDeliverId').show();
                    $('#prepareGiftId').attr("disabled", false);
                    initFn();
                } else {
                    $('#prepareGiftId').attr("disabled", false);
                    initFn();
                    write("infoMsgId", "Sled is empty! You need to add gifts!!!!")
                }
            });
    }
}

const initFn = () => {
    totalGiftWeight = 0
    gifts = []
    document.getElementById('sledDisplayId').innerHTML = "";
}

$("#prepareGiftId").click(function () {
    let giftTypeId = $("#giftTypeId").val();
    write("infoMsgId", "")
    let dwarf = new Dwarf();
    if (totalGiftWeight >= 12) {
        write("infoMsgId", "Gift weight exceeded!!")
    } else {
        if (giftTypeId === 'small') {
            dwarf.prepareGift(giftTypeId)
        } else if (giftTypeId === 'normal') {
            dwarf.prepareGift(giftTypeId)
        } else if (giftTypeId === 'big') {
            dwarf.prepareGift(giftTypeId)
        }
    }
});

$("#deliverGiftId").click(function () {
    $('#prepareGiftId').attr("disabled", true);
    write("infoMsgId", "Gifts are being delivered.\n Gifts can be added to the sled at the moment!!")
    let reindeers = new Reindeers();
    reindeers.deliverGift()
})

$("#reqToDeliverId").click(function () {
    $('#reqToDeliverId').hide();
    $('#deliverGiftId').attr("disabled", false);
    write("infoMsgId", "Reindeers are ready to deliver gifts now!!!!")
});

$(document).ready(initFn);