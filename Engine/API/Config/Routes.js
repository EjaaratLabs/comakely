module.exports = {
    "/transaction/testapi/:name": {
        controller: "testapi",
        allowedMethod: ['POST', 'GET']
    },
    "/transaction/testapi": {
        controller: "testapi",
        allowedMethod: ['POST', 'GET']
    },
    "/transaction/test2": {
        controller: "test2",
        allowedMethod: ['POST']
    },
    "/transaction/getcenters": {
        controller: "GetCenter",
        allowedMethod: ['GET']
    },
    "/transaction/createcenter": {
        controller: "PostCenter",
        allowedMethod: ['POST']
    }, "/transaction/getpermissions": {
        controller: "GetPermission",
        allowedMethod: ['GET']
    },
    "/transaction/getuserpermissions": {
        controller: "GetUserPermission",
        allowedMethod: ['GET']
    },
    "/transaction/getuserroles": {
        controller: "GetRoles",
        allowedMethod: ['GET']
    },
    "/transaction/getusers": {
        controller: "GetUsers",
        allowedMethod: ['GET']
    },
    "/transaction/createuser": {
        controller: "PostUser",
        allowedMethod: ['POST']
    },
    "/transaction/myprofile": {
        controller: "GetProfile",
        allowedMethod: ['GET']
    },
    "/transaction/changepassword": {
        controller: "ChangePassword",
        allowedMethod: ['POST']
    },
    "/transaction/resetpassword": {
        controller: "ResetPassword",
        allowedMethod: ['POST']
    },
    "/transaction/updateuser": {
        controller: "UpdateUser",
        allowedMethod: ['POST']
    },
    "/transaction/getchannel": {
        controller: "GetChannel",
        allowedMethod: ['GET']
    },
    "/child/newprofile": {
        controller: "PostChildProfile",
        allowedMethod: ['POST']
    },
    "/child/list": {
        controller: "GetChildProfiles",
        allowedMethod: ['GET']
    },
    "/donor/newprofile": {
        controller: "PostDonorProfile",
        allowedMethod: ['POST']
    },
    "/donor/list": {
        controller: "GetDonorProfiles",
        allowedMethod: ['GET']
    },
    "/donor/link/child": {
        controller: "PostLinkDonorChild",
        allowedMethod: ['POST']
    },
    "/donor/link/list": {
        controller: "GetDonorLinkedChilds",
        allowedMethod: ['GET']
    },
    "/donor/delink/child": {
        controller: "PostDeLinkDonorChild",
        allowedMethod: ['POST']
    },
    "/donor/details": {
        controller: "GetDonorDetails",
        allowedMethod: ['GET']
    },
    "/newad": {
        controller: "PostAd",
        allowedMethod: ['POST']
    },
    "/ads": {
        controller: "GetAd",
        allowedMethod: ['GET']
    },
    "/vendors": {
        controller: "GetVendors",
        allowedMethod: ['GET']
    },
    "/ads/:id/details": {
        controller: "GetAdDetails",
        allowedMethod: ['GET']
    },
    "/vendor/:id/details": {
        controller: "GetVendorDetails",
        allowedMethod: ['GET']
    },
    "/user/requests": {
        controller: "GetUserRequests",
        allowedMethod: ['GET']
    },
    "/user/updatestatus": {
        controller: "PostUserStatusUpdate",
        allowedMethod: ['POST']
    },
    "/user/details": {
        controller: "GetUserDetails",
        allowedMethod: ['GET']
    },
    "/user/vendorprofile": {
        controller: "PostVendorProfile",
        allowedMethod: ['POST']
    },"/blog/list": {
        controller: "GetBlog",
        allowedMethod: ['GET']
    },
    "/blog/create": {
        controller: "PostBlog",
        allowedMethod: ['POST']
    },
}