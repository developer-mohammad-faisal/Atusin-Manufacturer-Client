import React, { Fragment, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import ConfirmModal from "./ConfirmModal";

const MyOrder = () => {
  const [deletingOrders, setDeletingOrders] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["ordersCollection", user.email], () =>
    fetch(` http://localhost:5000/orders?email=${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("accessToken");
        navigate("/");
      }
      return res.json();
    })
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <section>
        <div className="overflow-x-auto px-5 py-8 ">
          <table className="table border w-full text-center">
            <thead >
              <tr>
                <th>id</th>
                <th>Your Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Price</th>
                <th>Parts Name</th>
                <th>Payment</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>{order.yourName}</td>
                  <td>{order.email}</td>
                  <td>{order.location}</td>
                  <td>{parseInt(order.totalPrice)}</td>
                  <td>{order.partsName}</td>
                  <td>
                    {!order.paid && (
                      <Link to={`/dashboard/payment/${order._id}`}>
                        <button className="btn btn-sm uppercase btn-success">
                          pay
                        </button>
                      </Link>
                    )}
                    {/* {orders.paid && (
                      <div>
                        <p>
                          <span className="text-success">Paid</span>
                        </p>
                        <p>
                          Transaction id:{" "}
                          <span className="text-success">
                            {orders.transactionId}
                          </span>
                        </p>
                      </div>
                    )} */}
                  </td>
                  <td>
                    <label
                      onClick={() => setDeletingOrders(order)}
                      for="deleting-modal"
                      class="btn btn-sm  modal-button"
                    >
                      Cancel
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {deletingOrders && (
          <ConfirmModal
            refetch={refetch}
            deletingOrders={deletingOrders}
            setDeletingOrders={setDeletingOrders}
          />
        )}
      </section>
    </Fragment>
  );
};

export default MyOrder;
