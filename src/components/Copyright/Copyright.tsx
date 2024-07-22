import { FC } from "react";
import { Link, Typography, TypographyProps } from "@mui/material";

export const Copyright: FC<TypographyProps> = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
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
