// 计算 loadmore 组件的状态
export function getLoadMoreState(error: boolean, loading: boolean, isLastPage: boolean) {
  if (error) {
    return 'error'
  }
  if (loading) {
    return 'loading'
  }
  if (isLastPage) {
    return 'finished'
  }
  return 'loading'
}

export function loadmoreOtp(finishedText = '没有更多了') {
  return {
    loadingText: '正在加载更多...',
    finishedText,
    errorText: '加载失败，点击重试',
    loadingProps: {
      color: '#2D62B8',
    },
  }
}
