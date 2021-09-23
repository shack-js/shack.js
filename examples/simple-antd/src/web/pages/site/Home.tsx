import { PageHeader, Typography } from 'antd'
const { Paragraph } = Typography
const Home = () => {
  return <div>
    <PageHeader>首页</PageHeader>
    <Paragraph >
      本项目为示例项目，本项目包含用户注册、登录、后台管理
    </Paragraph>
  </div>
}

export default Home