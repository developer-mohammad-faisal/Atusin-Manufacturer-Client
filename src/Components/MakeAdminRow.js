import React, { Fragment } from "react";
import { toast } from "react-toastify";

const MakeAdminRow = ({ user, index, refetch }) => {
  const { email, role } = user;

  const handleMakeAdmin = () => {
    fetch(`https://gentle-ridge-79225.herokuapp.com/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an Admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Successfully Make an Admin");
        }
      });
  };

  return (
    <Fragment>
      <tr>
        <th>{index + 1}</th>
        <td>{email}</td>
        <td>
          {role !== "admin" ? (
            <button onClick={handleMakeAdmin} class="btn btn-sm btn-primary">
              Make Admin
            </button>
          ) : (
            <p class="text-success font-semibold">Already Admin</p>
          )}
        </td>
      </tr>
    </Fragment>
  );
};

export default MakeAdminRow;
