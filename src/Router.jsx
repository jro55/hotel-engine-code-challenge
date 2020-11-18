import React from "react"
import { Router } from "@reach/router"

import { RepositorySearch } from './components/repositorySearch';
import { RepositoryDetails } from './components/repository-details';

export default function BaseRouter() {
    return (
        <Router>
          <RepositorySearch path="/" />
          <RepositoryDetails path="details" />
        </Router>
      )
}