import { Router } from 'express';

const router = Router({mergeParams: true});

router.get('/', async (req, res) => {
  const scenario = await req.context.models.Scenario.findById(
    req.params.sid,
  );
  if (!scenario) {
    return res.sendStatus(404);
  }
  return res.send(scenario.items);
});

export default router;