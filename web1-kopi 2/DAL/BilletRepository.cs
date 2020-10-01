
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gruppeoppgave1.model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Gruppeoppgave1.DAL
{
    public class BilletRepository : DAL.IBilletRepository
    {
        private DBContext _db;
        private ILogger<BilletRepository> _log;
       


        public BilletRepository(DBContext db, ILogger<BilletRepository> log)
        {
            _db = db;
            _log = log;
            
        }


        public async Task<bool> Lagre(Billet lagreBillet)
        {

                try
                {
                    var nyBilletRad = new Billeter();
                nyBilletRad.Fra = lagreBillet.Fra;
                nyBilletRad.Til = lagreBillet.Til;


                //nyBilletRad.FraogTiltur = lagreBillet.FraogTiltur;
                nyBilletRad.DateFra = lagreBillet.DateFra;
                    nyBilletRad.DateRetur = lagreBillet.DateRetur;
                    nyBilletRad.Price = lagreBillet.Price;
                    nyBilletRad.Type = lagreBillet.Type;
                nyBilletRad.StrekningId = lagreBillet.StrekningId;




                await _db.Billeter.AddAsync(nyBilletRad);

                await _db.SaveChangesAsync();
                return true;

            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return false;
            }

        }
    





    public async Task<Billet> hentEnBillet(int BId)
        {
            try
            {

                Billeter enBillet = await _db.Billeter.FindAsync(BId);

                var utBillet = new Billet()
                {
                    BId = enBillet.BId,
                    //FraogTiltur = enBillet.FraogTiltur,
                    Fra = enBillet.Fra,
                    Til = enBillet.Til,


                    Price = enBillet.Price,
                    DateFra = enBillet.DateFra,
                    DateRetur = enBillet.DateRetur,
                    Type = enBillet.Type,
                    StrekningId = enBillet.StrekningId,
                };
                return utBillet;
            }
            catch (Exception e)
            {
                _log.LogInformation(e.Message);
                return null;
            }
        }

        

        public async Task<List<Billet>> HentalleBilleter()

        {

           
                try
                {
                var billet = new Billet();

                List<Billet> alleBilleter = await _db.Billeter.Select(a => new Billet
                    {

                        BId = a.BId,
                    //FraogTiltur = a.FraogTiltur,
                    Fra = a.Fra,
                    Til = a.Til,


                        Price = a.Price,
                        DateFra = a.DateFra,
                        DateRetur = a.DateRetur,
                        Type = a.Type,
                        StrekningId=a.StrekningId,

                    }).ToListAsync();
                    return alleBilleter;
                }
                catch (Exception e)
                {
                    _log.LogInformation(e.Message);
                    return null;

                }
            }
        



                public async Task<bool> slettBillet(int BId)

        {
            
                try
                {
                    //hello test
                    var slettObjekt = _db.Billeter.Find(BId);
                    _db.Billeter.Remove(slettObjekt);
                    await _db.SaveChangesAsync();
                    return true;
                }
                catch (Exception e )
                {
                    _log.LogInformation(e.Message);
                     return false;
                }
            }
        

        public async Task<bool> Endre(int BId, Billet endreBillet)
        {

            try
                {
                    Billeter endreBilleter = _db.Billeter.Find(BId);
                //endreBilleter.FraogTiltur = endreBillet.FraogTiltur;
                endreBilleter.Fra = endreBillet.Fra;
                endreBilleter.Til = endreBillet.Til;

                endreBilleter.Price = endreBillet.Price;
                    endreBilleter.DateFra = endreBillet.DateFra;
                    endreBilleter.DateRetur = endreBillet.DateRetur;


                    endreBilleter.Type = endreBillet.Type;
                endreBilleter.StrekningId = endreBillet.StrekningId;




                await _db.SaveChangesAsync();
                    return true;

                }
                catch (Exception e )
                {
                    _log.LogInformation(e.Message);
                    return false;
                }

            }
        }


    }
