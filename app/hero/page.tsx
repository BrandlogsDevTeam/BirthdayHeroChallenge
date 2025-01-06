import { redirect } from 'next/navigation'

const InvalidHeroRedirect = () => {
  return <>
    {redirect('/')}
  </>
}

export default InvalidHeroRedirect