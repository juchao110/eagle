const version = '/site/api/v1.0'
import {
  fetch,
  imgFetch
} from './fetch'

/*
 ******** login api  *******
 */
export function loginByUsername(data) {
  return fetch({
    url: `${version}/user/login`,
    method: 'post',
    data
  })
}
export function getUserInfo(token) {
  return fetch({
    url: `${version}/user/info`,
    method: 'post'
  })
}

/*
 ******** metrics api  *******
 */
export function fetchOverview(now, user_id) {
  return fetch({
    url: `${version}/view/all/${now}/${user_id}`,
    method: 'get'
  })
}

export function fetchPoolview(now, user_id, pool_id) {
  return fetch({
    url: `${version}/view/pool/${now}/${user_id}/${pool_id}`,
    method: 'get'
  })
}

export function fetchRackview(now, user_id, pool_id, rack) {
  return fetch({
    url: `${version}/view/rack/${now}/${user_id}/${pool_id}/${rack}`,
    method: 'get'
  })
}


/*
 ******** monitor api  *******
 */
export function alarmList(data) {
  return fetch({
    url: `${version}/alert/getlist`,
    method: 'post',
    data
  })
}
export function changeAlarm(id, status) {
  const data = {
    'status': status
  }
  return fetch({
    url: `${version}/alert/enable/${id}`,
    method: 'post',
    data
  })
}

export function deleteAlarm(id) {
  return fetch({
    url: `${version}/alert/del/${id}`,
    method: 'post'
  })
}

export function getMonitorStatus(data) {
  return fetch({
    url: `${version}/minerchange/getsummarylist`,
    method: 'post',
    data
  })
}

/*
 ******** customer api  *******
 */

export function fetchCustomersList(now, user_id) {
  return fetch({
    url: `${version}/customerview/customerlist/${now}/${user_id}`,
    method: 'get'
  })
}

export function fetchCustomerOverview(now, user_id) {
  return fetch({
    url: `${version}/customerview/all/${now}/${user_id}`,
    method: 'get'
  })
}
export function fetchCustomerPoolview(now, user_id, pool_id) {
  return fetch({
    url: `${version}/customerview/pool/${now}/${user_id}/${pool_id}`,
    method: 'get'
  })
}

export function fetchCustomerRackview(now, user_id, pool_id, rack) {
  return fetch({
    url: `${version}/customerview/rack/${now}/${user_id}/${pool_id}/${rack}`,
    method: 'get'
  })
}