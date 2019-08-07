using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeaRound.Models;

namespace TeaRound.Controllers
{
    [Route("api/round")]
    [ApiController]
    public class RoundController : ControllerBase
    {
        private readonly RoundContext _context;
        static Random rnd = new Random();
        public RoundController(RoundContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Player>>> GetPlayers()
        {
            return await _context.Players.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Player>> GetPlayer(int id)
        {
            return await _context.Players.FindAsync(id);
        }

        [HttpGet("GetRandomPlayer")]
        public async Task<ActionResult<Player>> GetRandomPlayer()
        {
            //Get random number from count of players
            var numberOfPlayers = _context.Players.Count();
            var randomNumber = rnd.Next(numberOfPlayers);

            //Get all players currently in list
            var allPlayers = await GetPlayers();
            //Return into an array
            var allPlayersArray = allPlayers.Value.ToArray();

            //Get player from array using the randomNumber
            return await GetPlayer(allPlayersArray[randomNumber].Id);
        }

        [HttpPost]
        public async Task<ActionResult<Player>> PostPlayer(Player player)
        {
            player.TimesSelected = 0;
            if(player.Name == string.Empty){
                return BadRequest();
            }
            _context.Add(player);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlayer", new { id = player.Id }, player);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePlayer(int id)
        {
            var playerToRemove = await _context.Players.FindAsync(id);

            if (playerToRemove == null)
            {
                NotFound();
            }
            _context.Players.Remove(playerToRemove);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
