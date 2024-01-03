using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BruteForce.Models;
using BruteForce.Services;
using BruteForce.DTOs;

namespace BruteForce.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameController : ControllerBase
    {
        private readonly GameService _gameService;

        public GameController(GameService gameService)
        {
            _gameService = gameService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<GameDTO>> GetGames()
        {
            var games = _gameService.GetAllGames();
            return Ok(games);
        }

        [HttpGet("{id}")]
        public ActionResult<GameDTO> GetGameById(int id)
        {
            var game = _gameService.GetGameById(id);
            if (game == null)
                return NotFound();
            return Ok(game);
        }

        [HttpPost]
        public ActionResult<GameDTO> CreateGame(GameDTO gameDTO)
        {
            var createdGame = _gameService.CreateGame(gameDTO);
            return CreatedAtAction(nameof(GetGameById), new { id = createdGame.Id }, createdGame);
        }

        [HttpPut("{id}")]
        public ActionResult<GameDTO> UpdateGame(int id, GameDTO gameDTO)
        {
            var updatedGame = _gameService.UpdateGame(id, gameDTO);
            if (updatedGame == null)
                return NotFound();
            return Ok(updatedGame);
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteGame(int id)
        {
            if (_gameService.DeleteGame(id))
                return NoContent();
            return NotFound();
        }
    }
}
