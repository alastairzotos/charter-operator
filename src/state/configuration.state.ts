import { createQuery } from "@bitmetro/create-query";

import { getConfiguration } from "clients/configuration.client";

export const useGetConfiguration = createQuery(getConfiguration);
