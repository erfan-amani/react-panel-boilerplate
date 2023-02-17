import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../redux/reducers/auth/asyncActions";

export const useUser = () => {
  const dispatch = useDispatch();
  const { pending, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!pending && !!accessToken) {
      dispatch(updateUserData());
    }
  }, [pending, accessToken]);
};
