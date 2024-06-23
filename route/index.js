import express from 'express'
import Auth from './AuthRoute.js'
import Artikel from './ArtikelRoute.js'
import Resep from './ResepRoute.js'
import Kategori from './KategoriRoute.js'
import Favorite from './FavoriteRoute.js'
import Users from './UserRoute.js'
import Coment from './ComentRoute.js'
import Contact from './ContactRoute.js'


const router = express()

router.use(Auth)
router.use(Artikel)
router.use(Resep)
router.use(Kategori)
router.use(Favorite)
router.use(Users)
router.use(Coment)
router.use(Contact)


export default router
