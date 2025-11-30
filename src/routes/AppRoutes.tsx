import Layout from '@/components/common/layout/Layout'
import { Courses, Main, Manage, YeeunTest } from '@/pages'
import { Route, Routes } from 'react-router'
function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 이곳에 라우팅 추가하기 */}
        <Route index element={<Main />} />
        <Route path="/courses" element={<Courses></Courses>}></Route>
        <Route path="/yeeun" element={<YeeunTest></YeeunTest>}></Route>
        <Route path="/posting/manage" element={<Manage />}></Route>
      </Route>
    </Routes>
  )
}
export default AppRoutes
