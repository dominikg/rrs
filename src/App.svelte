<script>
  import './style/main.css'
  import { Router } from '@sveltech/routify/runtime'

  // NOTE actually I don't think sure Routify supports hot swapping of routes...
  // would probably need to rerun routing
  // import routes from './routes';
  import { routes } from '../.routify/routes'
</script>

<Router {routes} />
