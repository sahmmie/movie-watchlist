import express from 'express';
import List from '../models/list';
import auth from '../middleware/auth';
import { IMovie } from '../interfaces';

const router = express.Router();

router.get('/watchlist', auth, async (req, res) => {
  try {
    const list = await List.findOne({ _user: req.user._id });
    res.status(200).send(list?.watchlist ?? []);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/watchlist', auth, async (req, res) => {
  try {
    const movieData: IMovie = {
      name: req.body.name as string
    };

    let list = await List.findOne({ _user: req.user._id });
    if (!list) {
      list = new List({ _user: req.user._id });
    }

    list.watchlist.push(movieData);
    await list.save();

    res.status(200).send(list.watchlist);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/favorites/:id', auth, async (req, res) => {
  try {
    const movieData: IMovie = {
      name: req.body.name as string
    };

    const list = await List.findOne({ _user: req.user._id });
    if (!list) return res.status(404).send();

    const movie = list.watchlist.find((movie: IMovie) => movie._id === req.params.id);
    if (!movie) return res.status(404).send();

    movie.name = movieData.name;
    await list.save();

    res.status(200).send(list.favorites);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/watchlist/:id', auth, async (req, res) => {
  try {
    const list = await List.findOneAndUpdate(
      { _user: req.user._id },
      { $pull: { watchlist: { _id: req.params.id } } },
      { new: true }
    );
    if (!list) return res.status(404).send();

    res.status(200).send(list?.watchlist);
  } catch (e) {
    res.status(500).send();
  }
});

export default router;
