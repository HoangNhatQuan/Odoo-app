import './index.scss'

const LoadingPage = (props: {
  msg?: string
  height?: number
  page?: boolean
}) => {
  return (
    <div
      className="loading-page"
      style={{
        height: props?.height
          ? props.height
          : props.page
          ? 'calc(100vh - 140px);'
          : undefined,
      }}
    >
      <span className="text-secondary" style={{ fontSize: 10 }}>
        {props.msg}
      </span>
      <div className="loader" />
    </div>
  )
}

export default LoadingPage
