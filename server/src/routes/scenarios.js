import { Router } from 'express';
import items from './items';

const router = Router();

router.get('/', async (req, res) => {
  const scenarios = await req.context.models.Scenario.find();
  return res.send(scenarios);
});

router.post('/', async (req, res) => {
  const scenario = await req.context.models.Scenario.create({
    owner: req.context.currentUser.id,
    items: [],
  });
  return res.send(scenario);
});

router.get('/:sid', async (req, res) => {
  const scenario = await req.context.models.Scenario.findById(
    req.params.sid,
  );
  return res.send(scenario);
});

router.post('/import', async (req, res) => {

  const items = req.body.items;
  const scenario = await req.context.models.Scenario.create({
    owner: req.context.currentUser.id,
    items,
  });
  return res.send(scenario);
});

router.use('/:sid/items', items);

export default router;