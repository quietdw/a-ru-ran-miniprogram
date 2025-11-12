import homeIcon from '@/static/img/tabbar/home.png'
import mineIcon from '@/static/img/tabbar/mine.png'
import calendarIcon from '@/static/img/tabbar/calendar.png'
import cartIcon from '@/static/img/tabbar/cart.png'
import messageIcon from '@/static/img/tabbar/message.png'
import homeActiveIcon from '@/static/img/tabbar/home-active.png'
import mineActiveIcon from '@/static/img/tabbar/mine-active.png'
import calendarActiveIcon from '@/static/img/tabbar/calendar-active.png'
import cartActiveIcon from '@/static/img/tabbar/cart-active.png'
import messageActiveIcon from '@/static/img/tabbar/message-active.png'

export interface TabbarItem {
  name: string
  value: number | null
  active: boolean
  title: string
  icon: string
  activeIcon: string
}

const tabbarItems = ref<TabbarItem[]>([
  { name: 'home', value: null, active: true, title: '阿如然', icon: homeIcon, activeIcon: homeActiveIcon },
  { name: 'consult', value: null, active: false, title: '咨询', icon: messageIcon, activeIcon: messageActiveIcon },
  { name: 'appointment', value: null, active: false, title: '预约', icon: calendarIcon, activeIcon: calendarActiveIcon },
  { name: 'mall', value: null, active: false, title: '商城', icon: cartIcon, activeIcon: cartActiveIcon },
  { name: 'mine', value: null, active: false, title: '我的', icon: mineIcon, activeIcon: mineActiveIcon },
])

export function useTabbar() {
  const tabbarList = computed(() => tabbarItems.value)

  const activeTabbar = computed(() => {
    const item = tabbarItems.value.find(item => item.active)
    return item || tabbarItems.value[0]
  })

  const getTabbarItemValue = (name: string) => {
    const item = tabbarItems.value.find(item => item.name === name)
    return item && item.value ? item.value : null
  }

  const setTabbarItem = (name: string, value: number) => {
    const tabbarItem = tabbarItems.value.find(item => item.name === name)
    if (tabbarItem) {
      tabbarItem.value = value
    }
  }

  const setTabbarItemActive = (name: string) => {
    tabbarItems.value.forEach((item) => {
      if (item.name === name) {
        item.active = true
      }
      else {
        item.active = false
      }
    })
  }

  return {
    tabbarList,
    activeTabbar,
    getTabbarItemValue,
    setTabbarItem,
    setTabbarItemActive,
  }
}
