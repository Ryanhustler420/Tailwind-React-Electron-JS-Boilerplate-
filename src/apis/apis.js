import _ from "lodash";
import axios from "axios";
import FormData from 'form-data';
import * as URLs from "./urls";

let deviceName = 'Electron';
let deviceUUID = 'SomeJibrish';
let APP_NAME = 'app_name';

window.electron?.os.systemDetails.send();
window.electron?.os.systemDetails.openL(sys_info_object => {
    window.electron?.os.systemDetails.closeL();
    deviceUUID = sys_info_object.combine;
});

export const getImageContainerStatus = async (ic) => {
    return await axios.get(URLs.GET_IC_STATUS.replace('/:ic', `/${ic}`));
}

export const loginUser = async () => {
    return {};
}

export const logout = async () => {
    return true;
}

export const updateUserProfile = async () => {
    return {};
}

export const getCurrentLoggedInUser = async () => {
    return {};
}

export const registerNewUser = async (User) => {
    const requirements = ['imageUrl', 'password', 'address', 'country', 'gender', 'phone', 'email', 'state', 'fullName', 'city', 'dob'];
    if (!_.every(requirements, _.partial(_.has, User))) return Promise.reject('Some properties are missing');

    const form = new FormData();
    form.append('image', User['image']); // it's image file
    form.append('imageContainer', User['imageContainer']);
    form.append('imageUrl', User['imageUrl']);
    form.append('password', User['password']);
    form.append('address', User['address']);
    form.append('country', User['country']);
    form.append('gender', User['gender']);
    form.append('name', User['fullName']);
    form.append('phone', User['phone']);
    form.append('email', User['email']);
    form.append('state', User['state']);
    form.append('city', User['city']);
    form.append('dob', User['dob']);

    form.append('deviceUUID', deviceUUID);
    form.append('deviceName', deviceName);
    form.append('appName', APP_NAME);
    form.append('actor', 'electron');

    let roles = [];

    for (var i = 0; i < roles?.length; i++) { form.append('roles[]', roles[i]); }
    return await axios.post(URLs.POST_ENV_ELECTRON_USERS_CREATE, form, {
        headers: { "Content-Type": "multipart/form-data" }
    });
}