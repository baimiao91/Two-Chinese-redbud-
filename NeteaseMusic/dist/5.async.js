webpackJsonp([5],{qk6Z:function(e,a,t){"use strict";function n(e){return console.log("account::::props::::",e),Object(c.useEffect)(function(){e.getUserDet({uid:Object(o.b)()})},[]),s.a.createElement("div",{className:A.a.accountContainer},s.a.createElement("div",{className:"header"},"\u8d26\u53f7",s.a.createElement("img",{src:m.a,alt:"",className:"h_icon"})),s.a.createElement("div",{className:A.a.basicMsg},s.a.createElement("div",{className:"avatarName"},s.a.createElement("div",{className:"avatar"},s.a.createElement("img",{src:e.profile.avatarUrl,alt:""})),s.a.createElement("div",{className:"nameL"},s.a.createElement("div",{className:"name"},e.profile.nickname),s.a.createElement("div",{className:"level"},"Lv.",e.userDet.level)))),s.a.createElement("div",{className:A.a.dvnamic}),s.a.createElement("div",{className:A.a.navam},s.a.createElement("div",{className:A.a.navalist}),s.a.createElement("div",{className:A.a.navalist}),s.a.createElement("div",{className:A.a.navalist}),s.a.createElement("div",{className:A.a.navalist})))}Object.defineProperty(a,"__esModule",{value:!0});var c=t("bxP5"),s=t.n(c),l=t("NmwX"),i=(t.n(l),t("urBX")),A=t.n(i),r=t("vMMe"),m=t.n(r),o=t("0xDb"),v=function(e){return{userDet:e.account.userDet,profile:e.account.profile}},u=function(e){return{getUserDet:function(a){e({type:"account/getUserDet",payload:a})}}};a.default=Object(l.connect)(v,u)(n)},urBX:function(e,a){e.exports={accountContainer:"accountContainer___LsjB9",basicMsg:"basicMsg___hAAXv",dvnamic:"dvnamic___2VnOj",navam:"navam___2WEt7",navalist:"navalist___Cijge"}},vMMe:function(e,a){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAB6ElEQVRoQ+2ZMWhTURSGv3/TxaWbg3ToILgUihnsWBBcdCglUOygQnFxKB0LLu3oYimo4FQoSKFDO9WpSxelFJyUglO3TnZSsfjLg5vyxCS3r7wk78V7tyTk3v87/33n5JyImi/VXD8JYNAODqcDtl8BN4BpST8GHeVu5//jgO154E340q6ke3UDWAfmguivksYSQA8j0O4Kle6A7UfANWBVksvk6TmA7bvA+yD6qaTW81UKRz8AFoEXQe2apGelKA+bJIBYNG3/Xw7YvgPsAV+AhqSfRQtZqVmoqAO23wHNIPqBpJ26AWwD94PopqTN0gFsXweyCr0v6Xe3Ay7hQG8BbF8BPgOjwLKk53UDmAAOguhDSdnrjquKDjSAD0HxJ0njCSAXAds9fwaSA5ErlxzoWoltpyuUrlAuAoX7gXSFIh1ZqgO2UxbKZ5n0Y67shsb2CHAMXAU2JD2M5PVCcyHbK8ASkA3AbknKeo+Oq3AazXayPQVMAi8lnV5gMvE4N5mLdXBZw7QAHEnaiu19KYDYpv38PAH0M9rtzoo58B34OGiRufPPgFlJJ633YgAV0n4u5a9BQjuAJ8DbKioPmg4k3e7oQEiTr4GbFYT4BcxI+tYVoILCL17I6iQ+0zqcf3TXyYXaO/AHlaYYT/hiy9cAAAAASUVORK5CYII="}});