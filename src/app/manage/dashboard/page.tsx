import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardMain from './dashboard-main';

export default async function Dashboard() {
  // const cookieStore = cookies()
  // const accessToken = cookieStore.get('accessToken')?.value!
  // const result = await accountApiRequest.sMe(accessToken)


  // let name = '';


  // try {
  //   const result = await accountApiRequest.sMe(accessToken);
  //   name = result.payload.data.name;
  // } catch (error) {
  //   console.log(error);
  // }
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='space-y-2'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Phân tích các chỉ số</CardDescription>
          </CardHeader>
          <CardContent>
            <DashboardMain />
          </CardContent>
        </Card>
      </div>
    </main>

    // <div>Dashboard {name}</div>
  )
}
