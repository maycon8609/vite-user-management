import { Link, Typography } from "@mui/material"

export function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/maycon8609"
        target="blank"
      >
        maycon silva
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
