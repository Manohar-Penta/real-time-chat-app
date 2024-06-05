import { useLocation, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();

  console.log(location);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.message}</i>
        <i>at {location}</i>
      </p>
    </div>
  );
}
