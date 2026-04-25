import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import SummaryCard from "../../components/cards/SummaryCard.jsx";
import { LuPlus } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import Modal from "../../components/Modal.jsx";
import CreateSessionForm from "./CreateSessionForm.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSIONS.GET_ALL);
      setSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching session data: ", error);
    }
  };
  const deleteSession = async (id) => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.SESSIONS.DELETE(id),
      );
      if (response.data) {
        toast.success("Session Deleted!");
        fetchAllSessions();
      }
    } catch (error) {
      toast.error("Couldn't delete session");
      console.log("Session could not be deleted", error);
    }
  };
  useEffect(() => {
    fetchAllSessions();
  }, []);
  return (
    <DashboardLayout>
      <div className={`${openCreateModal ? "blur-xs" : ""}`}>
        <div className="md:px-10 md:py-15 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || ""}
              questions={data?.questionns?.length || ""}
              description={data?.description || ""}
              lastUpdated={
                data?.updatedAt
                  ? moment(data.updatedAt).format("Do MMM YYYY")
                  : ""
              }
              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              // onDelete={() => setOpenDeleteAlert({ open: true, data })}
              onDelete={() => deleteSession(data?._id)}
            />
          ))}
        </div>
        <button
          className="flex gap-2 items-center fixed bottom-10 right-10 bg-primary text-white font-semibold px-4 py-2 rounded-full cursor-pointer hover:shadow-2xl shadow-amber-600"
          onClick={() => setOpenCreateModal(true)}
        >
          <LuPlus /> <span>Add New</span>
        </button>
      </div>
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
    </DashboardLayout>
  );
}
