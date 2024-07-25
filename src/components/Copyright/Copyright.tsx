import { FC } from "react";
import { Link, Typography  } from "@mui/material";

import type { CopyrightProps } from "./types";

export const Copyright: FC<CopyrightProps> = ({
  "data-testid": datatestId = "copyright",
  ...props}) => {
  return (
    <Typography
      align="center"
      color="text.secondary"
      data-testid={`${datatestId}--typography`}
      variant="body2"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/maycon8609" target="blank">
        maycon silva
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
