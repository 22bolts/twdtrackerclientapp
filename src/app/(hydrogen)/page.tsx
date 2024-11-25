import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import CoreDashboard from '../shared/logistics/dashboard/coredashboard';

export const metadata = {
  ...metaObject(),
};

// export default function FileDashboardPage() {
//   return <FileDashboard />;
// }
export default function CoreDashboardPage() {
  return <CoreDashboard />;
}
