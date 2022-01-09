const bcrypt = require('bcryptjs');

import { usersRepo, omit } from 'helpers/api';

export default function getById(req, res) {
    const user = usersRepo.getById(1);

    if (!user) throw 'User Not Found';

    return res.json(omit(user, 'password'));
}