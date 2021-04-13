import httpRequest from '../utils/http'

module.exports = {
  login: function (provider, code) {
    let url = '/auth/miniprogram';
    if (provider === 'qq') {
      url = '/auth/QQMiniProgram'
    }
    return httpRequest.get(url, {code: code})
  },
  htmlLogin: function (mobile, code) {
    return httpRequest.post('/login', {mobile: mobile, code: code})
  },
  logout: function () {
    return httpRequest.get('/user/logout')
  },
  getLoginUser: function () {
    return httpRequest.get('/user/currentUser', {})
  },
  sendEmailCode: function (params) {
    return httpRequest.post('/mi/send_email_code', params)
  },
  updatePassword: function (params) {
    return httpRequest.post('/mi/update_password', params)
  },
  register: function (user) {
    return httpRequest.post('/mi/register', user)
  },
  updateUserInfo: function (user) {
    return httpRequest.post('/user/update', user)
  },
  initUserInfo: function (user) {
    return httpRequest.post('/user/init_current_user', user)
  },
  getCate: function () {
    return httpRequest.get('/carousel/loadCate', {})
  },
  recommendGoods: function (page) {
    return httpRequest.get('/carousel/loadRecommendGoods', {page: page})
  },
  getGoodsDetail: function (id, goodsId) {
    let params = {};
    if (id) {
      params.id = id
    }
    if (goodsId) {
      params.goodsId = goodsId
    }
    return httpRequest.get('/carousel/goodsDetail', params)
  },
  getGoodsByCate: function (subcid, page, sort) {
    return httpRequest.get('/carousel/loadGoodsByCate', {subcid: subcid, page: page, sort: sort})
  },
  getPrivilegeLink: function (goodsId) {
    return httpRequest.get('/carousel/getPrivilegeLink', {goodsId: goodsId})
  },
  getHotSearch: function () {
    return httpRequest.get('/carousel/getHotSearch', {})
  },
  search: function (keyword, page, sort) {
    return httpRequest.get('/mi/search', {keyword: keyword, page: page, sort: sort})
  },
  search2: function (keyword, page, sort, hasCoupon) {
    return httpRequest.get('/carousel/search2', {keyword: keyword, page: page, sort: sort, hasCoupon: hasCoupon})
  },
  favoriteGoods: function (goodsId) {
    return httpRequest.get('/collection/product/add', {productId: goodsId})
  },
  unFavoriteGoods: function (goodsId) {
    return httpRequest.get('/collection/product/remove', {productId: goodsId})
  },
  favoriteList: function (page, size) {
    return httpRequest.get('/collection/product/list', {page: page, size: size})
  },
  getNineGoods: function (page, size, nineCid) {
    return httpRequest.get('/carousel/loadNineGoods', {page: page, size: size, nineCid: nineCid})
  },
  getRankGoods: function (cid) {
    return httpRequest.get('/carousel/loadRankGoods', {cid: cid})
  },
  getSimilarGoods: function (daTaoKeGoodsId) {
    return httpRequest.get('/carousel/getSimilarGoods', {daTaoKeGoodsId: daTaoKeGoodsId})
  },
  listCarousel: function () {
    return httpRequest.post('/carousel/listCarousel', {})
  },
  listMenus: function () {
    return httpRequest.post('/carousel/listMenus', {})
  },
  recommendCollocations: function (page) {
    return httpRequest.get('/mi/collocation/load_recommend', {page})
  },
  collocationsList: function (page, sex) {
    if (sex) {
      return httpRequest.get('/mi/collocation/list', {page: page, sex: sex})
    }
    return httpRequest.get('/mi/collocation/list', {page})
  },
  recommendCollocations2: function (page) {
    return httpRequest.get('/mi/collocation/load_recommend2', {page})
  },
  addCollocationAppreciate: function (collocationId) {
    return httpRequest.get('/collocation/add_appreciate', {collocationId})
  },
  cancelCollocationAppreciate: function (collocationId) {
    return httpRequest.get('/collocation/cancel_appreciate', {collocationId})
  },
  collocationSimpleDetail: function (collocationId) {
    return httpRequest.get('/mi/collocation/simple_detail', {collocationId})
  },
  collocationProduct: function (collocationId) {
    return httpRequest.get('/mi/collocation/product', {collocationId})
  },
  getPrivilegeLink: function (goodsId) {
    return httpRequest.get('/carousel/getPrivilegeLink', {goodsId: goodsId})
  },
  getActiveGoodsList: function (page, activeId) {
    return httpRequest.get('/carousel/getActiveGoodsList', {page: page,activeId: activeId})
  },
  getHalfGoodsList: function () {
    return httpRequest.get('/carousel/getHalfGoodsList', {})
  },
  
  
  getDongdongGoodsList: function () {
    return httpRequest.get('/carousel/getDongList', {})
  },
}

