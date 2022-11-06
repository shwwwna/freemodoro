import { rest } from 'msw';

const notes = [
    {
        id: 0,
        userId: 'drix',
        note: 'testing onli',
        status: 'done',
        lastChangedAt: new Date("2022-11-06T23:50:21.817Z").toString()
    },
    {
        id: 1,
        userId: 'drix',
        note: 'testing onli 1',
        status: 'doing',
        lastChangedAt: new Date("2022-11-06T23:52:21.817Z").toString()
    },
];

const times = [
    {
        id: 0,
        timestamp: new Date("2022-11-06T23:50:21.817Z").toString(),
        userId: 'drix'
    },
    {
        id: 0,
        timestamp: new Date("2022-11-06T23:50:21.817Z").toString(),
        userId: 'erwin'
    },
]

const parseQueryStr = (searchQueryString) => {
    const paramsStrSplitted = searchQueryString.replace('?', '').split('=');
    const key = paramsStrSplitted[0];
    const value = paramsStrSplitted[1];
    return {[key]: value};
}

export const handlers = [
    rest.get('/notes', (req, res, context) => {
        const queryStr = req.url.search;
        if (!queryStr) {
            return res(context.json({
                success: false
            }));
        }
        const queryObj = parseQueryStr(queryStr)
        if (!queryObj.userId) {
            return res(context.json({
                success: false,
                msg: "userId required"
            }));
        }
        
        return res(context.json(notes.filter(t => t.userId === queryObj.userId)));
    }),
    rest.post('/note', async (req,res,context) => {
        const newNote = await req.json();
        notes.push(newNote);

        return res(context.json({
            success: true
        }))
    }),
    rest.get('/times', (req, res, context) => {
        const queryStr = req.url.search;
        if (!queryStr) {
            return res(context.json({
                success: false
            }));
        }
        const queryObj = parseQueryStr(queryStr)
        if (!queryObj.userId) {
            return res(context.json({
                success: false,
                msg: "userId required"
            }));
        }
        
        return res(context.json(times.filter(t => t.userId === queryObj.userId)));
    }),
    rest.post('/time', async (req,res,context) => {
        const newTime = await req.json();
        times.push(newTime);
        return res(context.json({
            success: true
        }))
    }),
    rest.post('/register', async (req,res,context) => {
        const credentials = await req.json();

        return res(context.json({
            success: true,
            username: credentials.username,
            accessToken: 'drixpogi123'
        }))
    }),
    rest.post('/login', async (req,res,context) => {
        const credentials = await req.json();

        return res(context.json({
            success: true,
            username: credentials.username,
            accessToken: 'drixpogi123'
        }))
    }),
]