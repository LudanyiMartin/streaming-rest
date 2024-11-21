import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get(':id(\\d+)')
  findOne(@Param('id') id: string) {
    return this.songsService.findOne(+id);
  }

  @Patch(':id(\\d+)')
  update(@Param('id') id: string, @Body() updateSongDto: UpdateSongDto) {
    return this.songsService.update(+id, updateSongDto);
  }

  @Delete(':id(\\d+)')
  remove(@Param('id') id: string) {
    return this.songsService.remove(+id);
  }

  @Get('free')
  freeSongs(){
    return this.songsService.freeSongs();
  }

  @Get('top')
  topSongs(@Query('count') count: String = '10'){
    return this.songsService.topSongs(+count);
  }
}


