import Router from "next/router";

export const refreshPage = () => {
  Router.replace(Router.asPath);
};