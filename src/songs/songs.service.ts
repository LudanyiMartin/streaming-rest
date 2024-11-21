import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  constructor(private readonly db: PrismaService){}
  create(createSongDto: CreateSongDto) {
    return 'This action adds a new song';
  }

  findAll() {
    return this.db.song.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} song`;
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }

  freeSongs(){
    this.db.song.findMany({
      where: {
        price: 0
      }
    });
  }

  topSongs(count: number){
    return this.db.song.findMany({
      orderBy:{
        rating: 'desc'
      },
      take: count
    })
  }

  topArtist(){
    /*
      SELECT artist, COUNT(artist)
      FROM song
      GROUP BY artist
      ORDER BY COUNT(artist) DESC
    */

      this.db.song.groupBy({
        by: 'artist',
        _count: {
          artist: true
        },
        orderBy: {
          _count: { artist: 'desc' }
        }
      })
  }
}
