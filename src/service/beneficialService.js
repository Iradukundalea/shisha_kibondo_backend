import db from "../models"

export default class BeneficialService {
    /**
     * @params beneficialId { string } - Beneficial ID
     */
    static async getBeneficialDetails(beneficialId){
        const include = [
            {
              model: db.User,
              as: 'nurse',
              attributes: {exclude: ['password']}
            },
            {
              model: db.Guardian,
              as: 'guardians'
            }
          ]
        
          try {
            const response = await db.beneficial.findOne({ where: { id: beneficialId }, include})
            return response
            
          } catch (error) {
            throw Error(error)
          }
    }
}
