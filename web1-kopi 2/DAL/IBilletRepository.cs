using System.Collections.Generic;
using System.Threading.Tasks;
using Gruppeoppgave1.model;

namespace Gruppeoppgave1.DAL
{
    public interface IBilletRepository
    {
       Task<bool> Lagre(Billet lagreBillet);

        Task<bool> Endre(int BId, Billet endreBillet);
        Task<bool> slettBillet(int BId);
        Task<List<Billet>> HentalleBilleter();
       Task< Billet> hentEnBillet(int BId);
    }
}