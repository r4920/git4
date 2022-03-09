/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter2378 = { 'updatedBy': { '$in': user } };
      const Blog3848 = await deleteBlog(BlogFilter2378);
      const BlogFilter2360 = { 'addedBy': { '$in': user } };
      const Blog7214 = await deleteBlog(BlogFilter2360);
      const userFilter0872 = { 'addedBy': { '$in': user } };
      const user9439 = await deleteUser(userFilter0872);
      const userFilter8228 = { 'updatedBy': { '$in': user } };
      const user3099 = await deleteUser(userFilter8228);
      const userTokensFilter6275 = { 'userId': { '$in': user } };
      const userTokens0791 = await deleteUserTokens(userTokensFilter6275);
      const userTokensFilter3149 = { 'addedBy': { '$in': user } };
      const userTokens4639 = await deleteUserTokens(userTokensFilter3149);
      const userTokensFilter8685 = { 'updatedBy': { '$in': user } };
      const userTokens8958 = await deleteUserTokens(userTokensFilter8685);
      const roleFilter1585 = { 'addedBy': { '$in': user } };
      const role2872 = await deleteRole(roleFilter1585);
      const roleFilter3315 = { 'updatedBy': { '$in': user } };
      const role4731 = await deleteRole(roleFilter3315);
      const projectRouteFilter3736 = { 'addedBy': { '$in': user } };
      const projectRoute9776 = await deleteProjectRoute(projectRouteFilter3736);
      const projectRouteFilter3343 = { 'updatedBy': { '$in': user } };
      const projectRoute4439 = await deleteProjectRoute(projectRouteFilter3343);
      const routeRoleFilter6298 = { 'addedBy': { '$in': user } };
      const routeRole1143 = await deleteRouteRole(routeRoleFilter6298);
      const routeRoleFilter9665 = { 'updatedBy': { '$in': user } };
      const routeRole9672 = await deleteRouteRole(routeRoleFilter9665);
      const userRoleFilter5543 = { 'userId': { '$in': user } };
      const userRole5328 = await deleteUserRole(userRoleFilter5543);
      const userRoleFilter6546 = { 'addedBy': { '$in': user } };
      const userRole5981 = await deleteUserRole(userRoleFilter6546);
      const userRoleFilter8661 = { 'updatedBy': { '$in': user } };
      const userRole4883 = await deleteUserRole(userRoleFilter8661);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter1908 = { 'roleId': { '$in': role } };
      const routeRole6771 = await deleteRouteRole(routeRoleFilter1908);
      const userRoleFilter1606 = { 'roleId': { '$in': role } };
      const userRole9346 = await deleteUserRole(userRoleFilter1606);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter4056 = { 'routeId': { '$in': projectroute } };
      const routeRole1307 = await deleteRouteRole(routeRoleFilter4056);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter3924 = { 'updatedBy': { '$in': user } };
      const Blog2537 = await softDeleteBlog(BlogFilter3924, updateBody);
      const BlogFilter1340 = { 'addedBy': { '$in': user } };
      const Blog0448 = await softDeleteBlog(BlogFilter1340, updateBody);
      const userFilter4225 = { 'addedBy': { '$in': user } };
      const user7551 = await softDeleteUser(userFilter4225, updateBody);
      const userFilter2401 = { 'updatedBy': { '$in': user } };
      const user9497 = await softDeleteUser(userFilter2401, updateBody);
      const userTokensFilter2286 = { 'userId': { '$in': user } };
      const userTokens8855 = await softDeleteUserTokens(userTokensFilter2286, updateBody);
      const userTokensFilter4646 = { 'addedBy': { '$in': user } };
      const userTokens6182 = await softDeleteUserTokens(userTokensFilter4646, updateBody);
      const userTokensFilter7487 = { 'updatedBy': { '$in': user } };
      const userTokens9916 = await softDeleteUserTokens(userTokensFilter7487, updateBody);
      const roleFilter4327 = { 'addedBy': { '$in': user } };
      const role1998 = await softDeleteRole(roleFilter4327, updateBody);
      const roleFilter9523 = { 'updatedBy': { '$in': user } };
      const role8209 = await softDeleteRole(roleFilter9523, updateBody);
      const projectRouteFilter8608 = { 'addedBy': { '$in': user } };
      const projectRoute1198 = await softDeleteProjectRoute(projectRouteFilter8608, updateBody);
      const projectRouteFilter0753 = { 'updatedBy': { '$in': user } };
      const projectRoute4746 = await softDeleteProjectRoute(projectRouteFilter0753, updateBody);
      const routeRoleFilter5216 = { 'addedBy': { '$in': user } };
      const routeRole3933 = await softDeleteRouteRole(routeRoleFilter5216, updateBody);
      const routeRoleFilter8455 = { 'updatedBy': { '$in': user } };
      const routeRole7814 = await softDeleteRouteRole(routeRoleFilter8455, updateBody);
      const userRoleFilter1658 = { 'userId': { '$in': user } };
      const userRole2286 = await softDeleteUserRole(userRoleFilter1658, updateBody);
      const userRoleFilter6659 = { 'addedBy': { '$in': user } };
      const userRole8369 = await softDeleteUserRole(userRoleFilter6659, updateBody);
      const userRoleFilter7544 = { 'updatedBy': { '$in': user } };
      const userRole9889 = await softDeleteUserRole(userRoleFilter7544, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter5084 = { 'roleId': { '$in': role } };
      const routeRole5948 = await softDeleteRouteRole(routeRoleFilter5084, updateBody);
      const userRoleFilter1713 = { 'roleId': { '$in': role } };
      const userRole6566 = await softDeleteUserRole(userRoleFilter1713, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter4168 = { 'routeId': { '$in': projectroute } };
      const routeRole0700 = await softDeleteRouteRole(routeRoleFilter4168, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
