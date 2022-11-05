import {
  Button,
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";

export default function AddGuardianPage() {
  const { theme } = useContext(ThemeContext);
  const { socialRecovery } = useContext(AuthContext);
  const [guardians, setGuardians] = useState([]);
  const [guardian, setGuardian] = useState();

  useEffect(() => {
    socialRecovery
      .getAllGuardians()
      .then((data) => {
        console.log(data);
        setGuardians(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRemoveItem = (index) => {
    setGuardians((currArray) => currArray.filter((item, i) => index !== i));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: 20,
        backgroundColor: theme.ui,
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          paddingBlock: 20,
          minHeight: 700,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 20,
          width: "100%",
        }}
      >
        <h1>Guardian</h1>

        <div>
          <form
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
            // onClick={(e) => {
            //   e && e.preventDefault();
            //   if (guardians.length > 0) {
            //     setGuardians((oldArray) => [...oldArray, guardian]);
            //   }
            // }}
          >
            <InputBase
              sx={{
                // borderRadius: 5,
                border: "1px rgba(256,256,256,.25) solid",
                backgroundColor: theme.backgroundColor + "bf",
                color: "#FFF",
                height: 40,
                paddingInline: 15,
                fontSize: 16,
                width: "100%",
                maxWidth: 350,
              }}
              placeholder="Add Guardian"
              value={guardian}
              onChange={(e) => setGuardian(e.target.value)}
              autoFocus
            />

            <Button
              type="submit"
              //disabled={guardians.length >= 3}
              sx={{
                // borderRadius: 5,
                textTransform: "none",
                height: 40,
                backgroundColor: "#333333",
                color: "#d0d0d0",
                fontSize: "1.2rem",
              }}
              onClick={() => {
                alert(guardian);
              }}
            >
              Add
            </Button>
          </form>
        </div>
        <div>
          <TableContainer>
            <Table
              sx={{
                minWidth: 450,
                backgroundColor: "#161918" || theme.backgroundColor,
                overflowY: "scroll",
              }}
              aria-label="simple table"
            >
              <TableHead sx={{}}>
                <TableRow>
                  <TableCell
                    sx={{
                      borderBottomColor: "rgba(256,256,256,.15)",
                      color: theme.textColor3,
                    }}
                  >
                    <h2
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      NEAR AccountId
                    </h2>
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottomColor: "rgba(256,256,256,.15)",
                      color: theme.textColor3,
                    }}
                  >
                    <h2
                      style={{
                        fontWeight: 500,
                      }}
                    >
                      Active
                    </h2>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      borderBottomColor: "rgba(256,256,256,.15)",
                      color: theme.textColor3,
                    }}
                  />
                </TableRow>
              </TableHead>

              {guardians.length > 0 && (
                <TableBody>
                  {guardians.map((guardian, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          borderBottomColor: "rgba(256,256,256,.25)",
                          color: theme.textColor,
                        }}
                      >
                        <h2
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {guardian[0]}
                        </h2>
                      </TableCell>

                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          borderBottomColor: "rgba(256,256,256,.25)",
                          color: theme.textColor,
                        }}
                      >
                        <h2
                          style={{
                            fontWeight: 500,
                          }}
                        >
                          {guardian[1] ? "True" : "False"}
                        </h2>
                      </TableCell>

                      <TableCell
                        align="right"
                        sx={{
                          padding: "5px 0",
                          borderBottomColor: "rgba(256,256,256,.25)",
                        }}
                      >
                        <IconButton
                          sx={{ width: 40, height: 40 }}
                          onClick={() => handleRemoveItem(index)}
                        >
                          <CloseRoundedIcon sx={{ color: theme.textColor3 }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>

          {guardians.length < 1 && (
            <div
              style={{
                width: "100%",
                minHeight: 250,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#161918" || theme.backgroundColor,
              }}
            >
              <h3 style={{ fontWeight: 500, color: theme.textColor3 }}>
                Please add your guardians
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
