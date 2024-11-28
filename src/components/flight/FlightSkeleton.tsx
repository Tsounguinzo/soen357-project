import {
  Card,
  CardContent,
  Box,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export function FlightSkeleton() {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Card
      elevation={0}
      sx={{
        cursor: "pointer",
        userSelect: "none",
        borderRadius: "20px",
        padding: "20px 0px",
        boxShadow: "0px 9px 36px 0px #00000017",
        width: "98%",
        margin: "0 auto",
        marginBottom: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "center", sm: "flex-start" },
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "12%",
              },
              alignSelf: { xs: "center", sm: "flex-start" },
            }}
          >
            <Skeleton
              variant="rectangular"
              width={isMobileView ? "100%" : 100}
              height={isMobileView ? 50 : 130}
              sx={{
                borderRadius: "10px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              flexWrap: "wrap",
              width: { xs: "100%", sm: "88%" },
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                alignSelf: "flex-start",
                gap: 2,
              }}
            >
              <Skeleton variant="text" width={isMobileView ? 50 : 100} />
              <Skeleton variant="text" width={isMobileView ? 75 : 150} />
              <Skeleton variant="text" width={isMobileView ? 50 : 100} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                alignSelf: "flex-start",
              }}
            >
              <Skeleton variant="text" width={isMobileView ? 50 : 100} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                alignSelf: "flex-start",
                gap: 1,
              }}
            >
              <Skeleton variant="text" width={80} />
              <Skeleton variant="rounded" width={80} height={80} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                alignSelf: "flex-start",
                gap: 1,
              }}
            >
              <Skeleton variant="text" width={80} />
              <Skeleton variant="rounded" width={80} height={80} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                alignSelf: "flex-start",
                gap: 1,
              }}
            >
              <Skeleton variant="text" width={80} />
              <Skeleton variant="rounded" width={80} height={80} />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                alignSelf: "flex-start",
                gap: 1,
              }}
            >
              <Skeleton variant="text" width={80} />
              <Skeleton variant="rounded" width={80} height={80} />
            </Box>
            <Skeleton variant="circular" width={20} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
