const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    // 1. check if user is logged in
    if (!ctx.request.userId) {
      throw new Error('you gotta be logged in!');
    }
    console.log(ctx.request.userId);
    // 2. Check if the user has the permissions to query all the users
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    // 3. if they do, query all the users
    return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    // 1. Make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You are not logged in')
    }
    // 2. Query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );
    // 3. Check if they have the permissions to see this order
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = 
    ctx.request.user.permissions.includes('ADMIN');
    if (!ownsOrder || !hasPermission) {
      throw new Error('You dont have permission to see this');
    }
    // 4. return the order
    return order;

  }
};

module.exports = Query;
