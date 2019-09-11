import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Coins from "@/components/Coins";
import OrangeLine from "@/components/OrangeLine/OrangeLine";
import RedLine from "@/components/RedLine/RedLine";
import RedTrains from "../components/RedLine/RedTrains";
import GreenTrains from "../components/GreenLine/GreenTrains";
import GreenLine from "../components/GreenLine/GreenLine";
import OrangeTrains from "../components/OrangeLine/OrangeTrains";


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/OrangeLine/',
      name: 'OrangeLine',
      component: OrangeLine
    },
    {
      path: '/OrangeLine/:forestHills',
      name: 'OLineTemp',
      component: OrangeTrains,
      props: true

    },
    {
      path: '/coins/:id',
      name: 'Coins',
      component: Coins
    },
    {
      path: '/RedLine',
      name: 'RedLine',
      component: RedLine
    },
    {
      path: '/RedLine/:alewifeID',
      name: 'RedLineTemp',
      component: RedTrains,
      props: true
    },
    {
      path: '/GreenLine',
      name: 'GreenLine',
      component: GreenLine
    },
    {
      path: '/GreenLine/:westID',
      name: 'GreenLineTemp',
      component: GreenTrains,
      props: true
    }
  ]
})
